export interface HtmlContent {
    content: string;
    status: number;
}
export interface CustomHtml {
    id?: number;
    event_id: string;
    custom_html_1?: HtmlContent;
    custom_html_2?: HtmlContent;
    custom_html_3?: HtmlContent;
}
