const GroupAlphabatically = (arr: any, key: string) => {

    const map = arr.reduce((acc: any, val: any) => {
        const label = key === "info" ? val?.info?.name : val[key];
        let char = label?.charAt(0).toUpperCase();
        acc[char] = [].concat((acc[char] || []), val);
        return acc;
    }, {});

    const res = Object.keys(map).map(el => ({
        letter: el,
        records: map[el]
    }));

    return res;
}

export default GroupAlphabatically