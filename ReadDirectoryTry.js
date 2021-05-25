// https://www.itread01.com/content/1545448326.html

const 
    fs = require('fs'),
    readline = require('readline'),
    groupBy = require('group-by'),
    join = require('path').join,
    getJsonFiles = (path) => { 
        let
            jsonFiles = [],//存所有檔案的位置//可能可以刪掉
            files = fs.readdirSync(path)//目錄底下的所有檔案
        files.forEach((item)=> {
            let
                fPath = join(path, item),
                stat = fs.statSync(fPath)               
            // console.log(path)
            // console.log(item)
            // console.log(stat)
            // console.log(fPath)
            if (stat.isDirectory() ) {
                getJsonFiles(fPath)
                // const
                //     statt = stat.isDirectory(fPath)
                // console.log(statt)
                // console.log(`<<dir:${fPath}>>`)
            }
            if (stat.isFile() ) { 
                jsonFiles.push(fPath)
                async function start() {
                    const  
                        stattt = stat.isFile(fPath),
                        fRead = fs.createReadStream(fPath),
                        fWrite = fs.createWriteStream('./test.txt'),
                        rl = readline.createInterface({
                            input: fRead,
                            output: fWrite
                        }),
                        arr = []
                    for await (const line of rl) {
                        // console.log(typeof line)
                        const
                            arrr = JSON.parse(line)
                        // console.log(arrr)
                        delete arrr.data
                        // arr.push(arrr)
                        // console.log(arrr)
                    
                    // console.log(arr)
                   
                        let
                            arrstr = JSON.stringify(arrr)
                        // console.log(arrstr)
                        arrstr = `${arrstr}\r\n`
                        fs.appendFileSync('./test.txt', arrstr)
                        console.log(arrstr)

                    }
                    
                    // fWrite.write(groupbystr)
                    // console.log(stattt)
                    // console.log(`<<file:${fPath}>>`);                              
                    

                    
                }
                start()
            }
        });

        // if (jsonFiles.length > 0)   {
            
            // console.log(jsonFiles)
        //     return jsonFiles //jsonFiles[0-3]--->Array[number]--->string
        // }
    }

getJsonFiles('./test/04/')
exports.getJsonFiles = getJsonFiles