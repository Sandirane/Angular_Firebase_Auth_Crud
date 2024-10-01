import { Injectable, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { AuthStateService } from '@app/shared/data-access/auth-state.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private collection: CollectionReference<Task>;

  loading = signal<boolean>(true);

  constructor(
    private firestore: Firestore,
    private authState: AuthStateService
  ) {
    this.collection = collection(this.firestore, PATH) as CollectionReference<Task>;
  }

  getTasks() {
    const tasks$ = collectionData(this.collection, { idField: 'id' }) as Observable<Task[]>;

    const pipedTasks$ = tasks$.pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError(error => {
        this.loading.set(false);
        return throwError(() => error);
      })
    );

    return toSignal(pipedTasks$, { initialValue: [] });
  }

  getTask(id: string) {
    const docRef = doc(this.collection, id);
    return getDoc(docRef);
  }

  create(task: TaskCreate) {
    return addDoc(this.collection, task);
  }

  update(task: TaskCreate, id: string) {
    const docRef = doc(this.collection, id);
    return updateDoc(docRef, {
      ...task,
      userId: this.authState.currentUser?.uid,
    });
  }

  delete(id: string) {
    const docRef = doc(this.collection, id);
    return deleteDoc(docRef);
  }
  
} 