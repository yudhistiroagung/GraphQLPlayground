export interface GraphQLProps {
    loading: boolean;
    error: any;
    data : {
        [key: string]: any;
    }
    [key: string]: any;
}