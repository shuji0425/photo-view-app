"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PhotoWithSortOrder } from "@/types/dto/photo";
import Image from "next/image";

type Props = {
  photos: PhotoWithSortOrder[];
  onReorder: (activeId: number, overId: number) => void;
};

/**
 * 写真の並び替え
 */
export const SortablePhotoList = ({ photos, onReorder }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const items = photos.map((p) => p.id);

  // 並び替え
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(Number(active.id), Number(over.id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {photos.map((photo) => (
            <SortablePhotoItem key={photo.id} photo={photo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

/**
 * 単一の画像要素
 */
const SortablePhotoItem = ({ photo }: { photo: PhotoWithSortOrder }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative aspect-square min-w-[150px] w-full border rounded overflow-hidden shadow-sm cursor-grab"
    >
      <Image
        src={photo.url}
        alt={`photo-${photo.id}`}
        fill
        className="object-cover"
      />
    </li>
  );
};
