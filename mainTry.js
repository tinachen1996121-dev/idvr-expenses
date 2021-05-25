
const
    fs = require('fs'),
    readline = require('readline'),
    groupBy = require('group-by')



async function start() {
    const
        fRead = fs.createReadStream('./test.txt'),  //一次只能放入一個位置
        fWrite = fs.createWriteStream('./testgroupby.txt'),
        rl = readline.createInterface({
            input: fRead,
            output: fWrite
        }),        
        arr = []
        
    for await (const line of rl) {
        const 
            arrr = JSON.parse(line)
        // console.log(arrr)
        arr.push(arrr)
    }
    // const
    //     arrr = JSON.parse(arr)
    console.log(arr)
    // console.log(arr[0].deviceid)
    const 
        groupby = groupBy(arr,'deviceid'),
        groupVal = Object.values(groupby),
        groupKey = Object.keys(groupby),
        writegroup = {},
        writegroup1 = []
    groupVal.forEach(eachgroup => writegroup1.push(eachgroup.length))
    // groupKey.forEach((eachgroup) => console.log(eachgroup))
    // writegroup1.map((number) => console.log(number))
    for (let i = 0; i < groupKey.length;i++) {
        writegroup[groupKey[i]] = writegroup1[i]
    }
    const
        groupbystr = JSON.stringify(writegroup, null, '\t')
    console.log(groupbystr)
    fWrite.write(groupbystr)
    
}

start()