import React, { useState, useRef, useEffect } from 'react';
import { useDraggable, useDndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { IoIosCloseCircle } from 'react-icons/io';

export interface ScrappyNoteType {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface ScrappyNoteProps {
  note: ScrappyNoteType;
  setBlockNoteCreation: (block: boolean) => void;
  setNotes: (notes: ScrappyNoteType[] | ((prevNotes: ScrappyNoteType[]) => ScrappyNoteType[])) => void;
  handleNoteDelete: (id: number) => void;
  showTooltip: boolean;
}

function ScrappyNote({ note, setBlockNoteCreation, handleNoteDelete, showTooltip }: ScrappyNoteProps) {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log('called useEffect');
    if (isEditing && textAreaRef.current) {
      setBlockNoteCreation(true);
      textAreaRef.current.focus();
    }
  }, [isEditing, setBlockNoteCreation]);

  const handleDoubleClick = () => {
    setBlockNoteCreation(true);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `scrappy-note-${note.id}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const { active } = useDndContext();
  const isDragging = active?.id === `scrappy-note-${note.id}`;
  const cursorStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return !isEditing ? (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#ffff99',
        width: '200px',
        height: '200px',
        position: 'absolute',
        left: note.x,
        top: note.y,
        color: 'black',
        ...cursorStyle,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      {...attributes}
      {...listeners}
      onDoubleClick={handleDoubleClick}
    >
      {showTooltip && (
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px',
            width: '150px',
          }}
        >
          Clique e arraste para posicionar o Scrappy onde quiser!
        </div>
      )}
      <IoIosCloseCircle
        onClick={(e) => {
          e.stopPropagation();
          handleNoteDelete(note.id);
        }}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          color: 'red',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          opacity: 0.1,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.1')}
      />

      <div>{text}</div>
    </div>
  ) : (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#ffff99',
        width: '200px',
        height: '200px',
        position: 'absolute',
        left: note.x,
        top: note.y,
        color: 'black',
      }}
    >
      {showTooltip && (
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '-90px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px',
            width: '150px',
          }}
        >
          Depois de confirmar, você pode clicar duas vezes para editar um Scrappy.
        </div>
      )}
      <textarea
        placeholder="Escreva seu scrappy ;)"
        ref={textAreaRef}
        value={text}
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            textAreaRef.current?.blur();
          }
        }}
        style={{
          height: '100%',
          width: '100%',
          color: 'black',
        }}
      />
    </div>
  );
}

export default ScrappyNote;
