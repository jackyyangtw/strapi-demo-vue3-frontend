export interface Restaurant {
    id: number;
    Name: string;
    // Description: Array<{
    //     type: string;
    //     children: Array<{ text: string }>;
    // }>;
    Description: Array<{
        type: "paragraph";
        children: Array<{ type: "text"; text: string }>;
    }>;
    categories: Array<{ id: number; Name: string }>;
    documentId: string;
}
