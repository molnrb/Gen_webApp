import { useMutation } from '@tanstack/react-query'
import { promptApi } from '../prompt-api'

export const useSendQuery = () => {
    return useMutation({
        mutationFn: (language: string,task: string) => {
            return promptApi.query({ prompt: language, mode: task })
        }
    })
}