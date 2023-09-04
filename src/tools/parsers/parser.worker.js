// Worker.js
// import MavlinkParser from 'mavlinkParser'
const mavparser = require('./mavlinkParser')
const DataflashParser = require('./JsDataflashParser/parser').default

const parsers = {}
self.addEventListener('message', function (event) {
    let parser
    if (event.data === null) {
        console.log('got bad file message!')
    } else if (event.data.action === 'parse') {
        if (event.data.isTlog) {
            parser = new mavparser.MavlinkParser()
        } else {
            parser = new DataflashParser(event.data.filename)
        }
        parsers[event.data.filename] = parser
        const data = event.data.file
        parser.processData(data)
    } else if (event.data.action === 'loadType') {
        if (!parser) {
            console.log('parser not ready')
        }
        const [fileName, messageType] = event.data.type.split('@')
        parsers[fileName].loadType(messageType.split('[')[0])
    } else if (event.data.action === 'trimFile') {
        throw new Error('not implemented')
        // parser.trimFile(event.data.time)
    }
})
