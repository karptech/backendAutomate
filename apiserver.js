const express = require('express')
const cors=require('cors')
var bodyParser = require('body-parser')
const multer = require("multer");
const excelToJson = require('convert-excel-to-json');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

const port = 4000
app.use(cors())

app.get('/',function(req,res,next){
    console.log("hell")
    const result = excelToJson({
      sourceFile: './uploads/Rates_HLL_UID02.xlsx'
    });
    res.send({result})
})


app.post('/', upload.single('file'), function (req, res, next) {
  
    console.log(req.file)
    const result = excelToJson({
        sourceFile: `./uploads/${req.file.filename}`
    });

    res.send(result)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})