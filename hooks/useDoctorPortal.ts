import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PatientSummary {
  id: string;
  full_name: string;
  selected_sport: string;
}

interface ExamSubmission {
  patient_id: string;
  exam_type: string;
  results: Record<string, any>;
  summary: string;
  concern_flags: string[];
}

export const useDoctorPortal = () => {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        const { data: { user: doctor } } = await supabase.auth.getUser();
        if (!doctor) throw new Error("Access denied");

        const { data: relations, error: relationError } = await supabase
          .from('patients_doctors')
          .select('patient_id')
          .eq('doctor_id', doctor.id);
        
        if (relationError) throw relationError;
        const patientIds = relations.map(r => r.patient_id);

        const { data: patientData, error: patientsError } = await supabase
          .from('profiles')
          .select('id, full_name, selected_sport')
          .in('id', patientIds);

        if (patientsError) throw patientsError;
        setPatients(patientData);

      } catch (err: any) {
        setError(err.message || "Error loading patients");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const submitExamResult = async (submission: ExamSubmission) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data: { user: doctor } } = await supabase.auth.getUser();
      if (!doctor) throw new Error("Access denied");
      
      const { error: insertError } = await supabase.from('medical_exams').insert({
        ...submission,
        doctor_id: doctor.id,
        submitted_at: new Date().toISOString()
      });

      if (insertError) throw insertError;
      return true;

    } catch (err: any) {
      setError(err.message || "Could not save exam results");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { 
    patients, 
    selectedPatient, 
    isLoading, 
    isSubmitting, 
    error, 
    setSelectedPatient, 
    submitExamResult 
  };
};