export interface UserProfile {
  id: string;
  name: string;
  color: string;
  avatar_url?: string | null;
}

export interface RoomMember {
  userId: string;
  name: string;
  color: string;
  joinedAt: string;
}

export interface RoomSetEvent {
  exerciseId: string;
  setNumber: number;
  completed: boolean;
  userId: string;
  userName: string;
  userColor: string;
  weight?: number;
  reps?: number;
}

export interface WorkoutRoom {
  id: string;
  room_code: string;
  host_user_id: string;
  host_name: string;
  workout_id?: string;
  workout_name: string;
  category?: string;
  status: 'active' | 'finished';
  created_at?: string;
}

