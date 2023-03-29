let blog = require("../modules/blog/blog.repo");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let path = require('path');
const fs = require("fs");

exports.exportBlogs = async (req, res) => {
  try {
    let result = await blog.list();
    let data = JSON.parse(JSON.stringify(result.records))
    const csvWriter = createCsvWriter({
      path: 'blogs.csv',
      header: [
        { id: '_id', title: 'id' },
        { id: 'title', title: 'title' },
        { id: 'description', title: 'description' }
      ]
    });


    csvWriter.writeRecords(data)       
      .then(() => {
        console.log('...Done');
        res.download(path.join(__dirname, '../blogs.csv'), () => {
          console.log("file download successfully!");
          fs.unlinkSync('./blogs.csv')
        })
      });

  } catch (err) {
    console.log("err.message", err.message)
    res.status(500).json({ error: "Unexpected Error!" });
  }
}