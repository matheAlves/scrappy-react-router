import React, { useState } from 'react';
import type { Route } from './+types/userProfile';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import ScrappyNote from '../components/ScrappyNote';
import type { ScrappyNoteType } from '../components/ScrappyNote';

export function meta({ params: { user } }: Route.MetaArgs) {
  return [{ title: user + ' - Scrappy' }, { name: user + "'s Scrappy page", content: 'Leave' + user + ' a Scrappy!' }];
}

export default function UserProfile({ params: { user } }: Route.ComponentProps) {
  const [notes, setNotes] = useState<ScrappyNoteType[] | []>([]);
  const [blockNoteCreation, setBlockNoteCreation] = useState(false);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (blockNoteCreation) {
      setBlockNoteCreation(false);
      return;
    }
    setNotes([
      ...notes,
      {
        id: notes.length ? notes[notes.length - 1].id + 1 : 0,
        x: e.clientX,
        y: e.clientY,
        text: '',
      },
    ]);
  };

  const handleNoteUpdate = (id: number, text: string, x: number, y: number) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text, x, y } : note)));
  };

  const handleNoteDelete = (id: number) => {
    console.log('delete note', id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
    const { active } = event;

    if (active.rect.current.translated) {
      const activeId = parseInt((active.id as string).replace('scrappy-note-', ''));
      const note = notes.find((note) => note.id === activeId);
      if (note) {
        const newX = active.rect.current.translated.left;
        const newY = active.rect.current.translated.top;
        handleNoteUpdate(note.id, note.text, newX, newY);
      }
    }
  };

  return (
    <div
      style={{ width: '100svw', height: '100svh', padding: 20 }}
      className="flex cursor-pointer justify-center items-center"
      onClick={handleScreenClick}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
        <section className="flex flex-col justify-center items-center self-start ">
          <img className="rounded-full w-36" src="/avatar.png"></img>
          <h1 className="text-5xl">{user}</h1>
        </section>
        {notes.length === 0 && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
              fontSize: '12px',
            }}
          >
            Clique em qualquer lugar para deixar um Scrappy!
            <br /> * Esta é apenas uma demonstração, os Scrappies não são salvos permanentemente. Atualize a página para
            limpar a tela.
          </div>
        )}
        {notes.map((note) => (
          <ScrappyNote
            key={note.id}
            note={note}
            setBlockNoteCreation={setBlockNoteCreation}
            setNotes={setNotes}
            handleNoteDelete={handleNoteDelete}
            showTooltip={notes.length === 1}
          />
        ))}
      </DndContext>
    </div>
  );
}
