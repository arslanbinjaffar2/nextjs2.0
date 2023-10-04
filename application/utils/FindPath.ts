const FindPath = (items: any, val: any) => {
    for (let i = 0; i < items?.length; i++) {
        const item = items[i];
        if (item.id !== val) {
            if (item.children_files) {
                const path: any = FindPath(item.children_files, val);
                if (path) {
                    path.unshift(item);
                    return path;
                }
            }
        } else {
            return [item];
        }
    }
}

export default FindPath