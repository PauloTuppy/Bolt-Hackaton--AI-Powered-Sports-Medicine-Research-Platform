import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  resource?: any;
  event_type: string;
}

interface UserProfileScheduleData {
  next_evaluation_date: string | null;
}

export const useUserSchedule = () => {
  const [profileData, setProfileData] = useState<UserProfileScheduleData | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isReevaluationDue, setIsReevaluationDue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const [profileRes, eventsRes] = await Promise.all([
          supabase
            .from('profiles')
            .select('next_evaluation_date')
            .eq('id', user.id)
            .single(),
          supabase
            .from('calendar_events')
            .select('*')
            .eq('user_id', user.id)
        ]);

        if (profileRes.error) throw profileRes.error;
        if (eventsRes.error) throw eventsRes.error;

        setProfileData(profileRes.data);

        const formattedEvents: CalendarEvent[] = eventsRes.data.map(event => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start_time),
          end: event.end_time ? new Date(event.end_time) : undefined,
          allDay: !event.end_time,
          resource: event,
          event_type: event.event_type,
        }));
        setEvents(formattedEvents);

        if (profileRes.data?.next_evaluation_date) {
          const nextEval = new Date(profileRes.data.next_evaluation_date);
          const today = new Date();
          setIsReevaluationDue(nextEval <= today);
        }

      } catch (err: any) {
        setError(err.message || "Failed to load schedule");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { isLoading, error, profileData, events, isReevaluationDue };
};