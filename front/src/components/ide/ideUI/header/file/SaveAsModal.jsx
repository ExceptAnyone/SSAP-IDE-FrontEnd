import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const SaveAsModal = ({ open, onClose, onSaveAs }) => {
  const [newFileName, setNewFileName] = useState("");

  const handleSave = () => {
    onSaveAs(newFileName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>다른 이름으로 저장</DialogTitle>
      <DialogContent>
        <DialogContentText>새로운 파일 이름을 입력해주세요.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="파일 이름"
          type="text"
          fullWidth
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSave} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
