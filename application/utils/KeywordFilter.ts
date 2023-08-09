const KeywordFilter = (nodes: any, column: any, keyword: any) => {

    const newNodes: any = [];

    for (const n of nodes) {
        if (n?.children_files !== undefined) {
            console.log(n)
            const nextNodes = KeywordFilter(n.children_files, column, keyword);
            if (n?.children_files !== undefined && nextNodes.length > 0) {
               // n.children_files = nextNodes;
            } else if (n?.children_files !== undefined && n?.[column]?.toLowerCase()?.includes(keyword.toLowerCase())) {
                console.log("sdsdsdsd")
                console.log(n)
                console.log("ssssss")
                //n.children_files = nextNodes.length > 0 ? nextNodes : [];
            }
            if (
                nextNodes.length > 0 ||
                n?.[column]?.toLowerCase().includes(keyword.toLowerCase())
            ) {
                n.label = n?.[column];
                newNodes.push(n);
            }
        } else {
            if (n?.[column]?.toLowerCase().includes(keyword.toLowerCase())) {
                n.label = n?.[column];
                newNodes.push(n);
            }
        }
    }

    return newNodes;
}

export default KeywordFilter