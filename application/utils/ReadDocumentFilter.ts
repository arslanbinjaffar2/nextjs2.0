const readDocument = (data: any[], document_id: any): Document[]|boolean => {
    console.log(data, 'filter');
    for (let obj of data) {
        if (obj.id === document_id) {
            return obj.children_files;
        }
        if (obj.children) {
            let result = readDocument(obj.children_files, document_id);
            if (result) {
                return result;
            }
        }
    }
    return false;
}

export default readDocument
