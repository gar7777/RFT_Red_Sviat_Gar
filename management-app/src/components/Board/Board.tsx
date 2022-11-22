import React, { useState, useEffect } from 'react';
import { CssBaseline, Stack, Button, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddColumnModal from './AddColumnModal';
import Column from './Column';
import styles from './Board.module.scss';
import { useParams } from 'react-router';
import { IBoard } from '../../store/boards/types/boards.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { createColumn, loadColumns, deleteColumn } from '../../store/columns/thunks/columns.thunks';
import {
  IColumn,
  IDeleteColumn,
  ICreateColumn,
  ILoadedColumn,
} from '../../store/columns/types/columns.type';
import { l18n } from '../../features/l18n';
import { Link } from 'react-router-dom';
import ConfirmModal from '../ConfirmModal';

function Board() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state: RootState) => state.boards);
  const currentBoard = boards.find((board: IBoard) => board.id === params.board);
  const boardId = currentBoard?.id || localStorage.getItem('currentBoard') || '';
  const boardTitle = currentBoard?.title || localStorage.getItem('currentBoardTitle') || '';
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const { columns } = useAppSelector((state: RootState) => state.columns);
  const [currentColumns, setCurrentColumns] = useState<ILoadedColumn[]>([]);
  const { lang } = useAppSelector((state: RootState) => state.lang);
  const currentColumn = useAppSelector((state: RootState) => state.columns.currentColumn);

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const addColumn = async ({ title }: IColumn) => {
    const columnData: ICreateColumn = {
      title: title,
      boardId: boardId,
    };
    await dispatch(createColumn(columnData));
    await dispatch(loadColumns(boardId));
    setAddColumnModal(false);
  };

  const handleDeleteColumn = async (): Promise<void> => {
    if (!currentColumn) return;
    const deleteData: IDeleteColumn = {
      id: currentColumn.id,
      boardId: boardId,
    };
    await dispatch(deleteColumn(deleteData));
    await dispatch(loadColumns(boardId));
    setDeleteConfirmModal(false);
  };

  const closeColumnModal = (): void => {
    setAddColumnModal(false);
  };

  useEffect(() => {
    setCurrentColumns([...columns]);
    return () => {
      localStorage.setItem('currentBoard', boardId);
      localStorage.setItem('currentBoardTitle', boardTitle);
    };
  }, [addColumnModal, deleteConfirmModal, columns]);

  useEffect(() => {
    dispatch(loadColumns(boardId));
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack className={styles.board_name__wrapper} direction="row">
        <Link to="/boards">
          <Button>
            <ArrowBackIcon /> BACK TO ALL BOARDS
          </Button>
        </Link>
        <h2 style={{ marginTop: '0.3rem', marginRight: '2rem' }}>{boardTitle}</h2>
        <Button onClick={handleAddColumn}>
          <AddBoxIcon /> {l18n[lang].addColumn}
        </Button>
      </Stack>
      <Box component="main" maxWidth="xs" className={styles['board__main-container']}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'start' }}>
          {currentColumns
            .sort((a, b) => a.order - b.order)
            .map(({ id, title, order }) => (
              <Column
                key={id}
                id={id}
                title={title}
                boardId={boardId}
                order={order}
                setDeleteConfirmModal={setDeleteConfirmModal}
              />
            ))}
        </Stack>
        {addColumnModal && (
          <AddColumnModal addColumn={addColumn} closeColumnModal={closeColumnModal} />
        )}
        {deleteConfirmModal && (
          <ConfirmModal
            confirm={handleDeleteColumn}
            deny={setDeleteConfirmModal}
            isOpen={deleteConfirmModal}
            type="column"
            title={currentColumn?.title}
            action={l18n[lang].deleteS}
          />
        )}
      </Box>
    </>
  );
}

export default Board;
