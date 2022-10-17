// type options = {
//     headers: String[],
// };

export default async function csvParse(fileName: string) {
    // const rawData = Bun.readFile('test-csv.csv') as string;
    // const rawData = fs.readFileSync('test-csv.csv') as string;
    const rawData = await Deno.readTextFile('./test-csv.csv');
    
    const arr = rawData.split('\n');
    const headers = arr[0].split(',');
    const returnArr = [];
    for (let i = 1; i < arr.length; i++) {
        const line = arr[i]; 
        const obj = {};
        line.split(',').forEach((e,j)=>{
            obj[headers[j]] = e;
        })
        returnArr.push(obj);
    }
    
    return returnArr;
}
