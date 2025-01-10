import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Box } from '@mui/material';
import { useColumnsFromBackend } from './cardData';

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px;
  margin-right: 45px;
  max-height: 500px;
  overflow-y: auto;

  @media screen and (max-width: 767px){
  margin-right: 0;
  min-width: 100%;
  }
`;

const TaskColumnStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
`;

const SummaryCard = () => {
  const initialColumns = useColumnsFromBackend();
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedColumns = { ...columns };

    if (source.droppableId === destination.droppableId) {
      const column = updatedColumns[source.droppableId];
      const items = Array.from(column.items);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      updatedColumns[source.droppableId] = { ...column, items };
    } else {
      const sourceColumn = updatedColumns[source.droppableId];
      const destColumn = updatedColumns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      updatedColumns[source.droppableId] = { ...sourceColumn, items: sourceItems };
      updatedColumns[destination.droppableId] = { ...destColumn, items: destItems };
    }

    setColumns(updatedColumns);

    localStorage.setItem('columns', JSON.stringify(updatedColumns));
  };

  const handleDelete = (columnId, cardId) => {
    const updatedColumns = { ...columns };
    const column = updatedColumns[columnId];
    const updatedItems = column.items.filter((item) => item.id !== cardId);

    updatedColumns[columnId] = { ...column, items: updatedItems };

    setColumns(updatedColumns);

    localStorage.setItem('columns', JSON.stringify(updatedColumns));
  };

  return (
    <>
      <Box className="heading">Summary Cards</Box>
      <DragDropContext onDragEnd={onDragEnd} className="drag_section">
        <Container className='droppable'>
          {Object.entries(columns).map(([columnId, column]) => (
            <TaskColumnStyles  key={columnId}>
              <Droppable  droppableId={columnId}>
                {(provided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="taskList"
                  >
                    <Title>{column.title} : &#40; {column.items.length} &#41;</Title>
                    {column.items.map((item, index) => (
                      <TaskCard
                        key={item.id}
                        item={item}
                        index={index}
                        onDelete={() => handleDelete(columnId, item.id)} 
                      />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </TaskColumnStyles>
          ))}
        </Container>
      </DragDropContext>
    </>
  );
};

export default SummaryCard;
