import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { AuthStateService } from '@app/shared/data-access/auth-state.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private collection: CollectionReference<Task>;

  constructor(
    private firestore: Firestore,
    private authState: AuthStateService
  ) {
    this.collection = collection(this.firestore, PATH) as CollectionReference<Task>;
  }

  getTasks() {
    return toSignal(
      collectionData(this.collection, { idField: 'id' }) as Observable<Task[]>,
      { initialValue: [] }
    );
  }

  create(task: TaskCreate) {
    return addDoc(this.collection, task);
  }
}
