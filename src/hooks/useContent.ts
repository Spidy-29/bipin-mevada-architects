
import { useQuery } from '@tanstack/react-query';
import { fetchAssets, fetchProjects } from '../services/sheetService';
import { Asset, Project } from '../types/cms';

export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false, // Don't refetch immediately if we have fresh data
    refetchOnWindowFocus: false,
  });
};

export const useProjectAssets = (projectId: string) => {
    const { data: assets, isLoading, error } = useAssets();
    
    const projectAssets = assets?.filter(a => a.project_id === projectId) || [];
    
    return { data: projectAssets, isLoading, error };
}
