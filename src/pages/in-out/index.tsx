import { useState, useEffect, useRef } from "preact/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";

function createItem(value: number, content: string) {
  return {
    value,
    content,
  };
}

export const InOut = (_props: any) => {
  const grid = 8;
  const [items, setItems] = useState<any>([createItem(10, "coffee")]);
  const [items2, setItems2] = useState<any>([]);

  function getItemStyle(isDragging: boolean, draggableStyle: any, height: any) {
    return {
      userSelect: "none",
      padding: grid * 2,
      background: isDragging ? "lightgreen" : "grey",
      height: `${height}px`,
      ...draggableStyle,
    };
  }

  function getListStyle(isDraggingOver: boolean) {
    return {
      background: isDraggingOver ? "lightblue" : "lightgrey",
      padding: grid,
      width: 250,
    };
  }

  function reorder(list: any[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: any) {
    console.log({ result });
    if (!result.destination) {
      return;
    }

    const _items = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(_items);
  }

  function onClickAddCal() {
    let content = prompt("What eat: ");
    let value = prompt("Cal: ");
    setItems((prev: any[]) => [...prev, { value, content }]);
  }

  function onClickAddActivity() {
    let content = prompt("What act: ");
    let value = prompt("Cal: ");
    setItems2((prev: any[]) => [...prev, { value, content }]);
  }

  return (
    <div class="in-out">
      <button onClick={() => onClickAddCal()}> Add</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided: any, snapshot: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item: any, index: number) => (
                <Draggable
                  key={`${item.number}-${item.value}-${index}`}
                  draggableId={`${item.number}-${item.value}-${index}`}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.value
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="droppable-2">
          {(provided: any, snapshot: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items2.map((item: any, index: number) => (
                <Draggable
                  key={`${item.number}-${item.value}-${index}`}
                  draggableId={`${item.number}-${item.value}-${index}`}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.value
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={() => onClickAddActivity()}> Add</button>
    </div>
  );
};
