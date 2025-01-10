import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;
  position: relative;
`;

const Logotext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 50px;
  height: 25px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: darkred;
  }
`;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  color: '#000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  textAlign: 'center',
};

const TaskCard = ({ item, index, onDelete }) => {
  const [open, setOpen] = useState(false);
  const draggableId = String(item.id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    onDelete(item.id); 
    handleClose();
  };

  return (
    <>
      <Draggable draggableId={draggableId} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskInformation className="task_card">
              <Logotext>
                <div>
                  <img className="image_width" src={item.image} alt={item.name} />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <p> Current Price: <strong>${item.current_price}</strong></p>
                  <p> High Price: <strong>${item.high_24h}</strong></p>
                  <p> Low Price: <strong>${item.low_24h}</strong></p>
                </div>
              </Logotext>
              
              <DeleteButton onClick={handleOpen}>Delete</DeleteButton>
            </TaskInformation>
          </div>
        )}
      </Draggable>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={modalStyle}>
          <Typography id="delete-confirmation-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this card?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskCard;
