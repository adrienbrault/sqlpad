var fs = require('fs');
var router = require('express').Router();
var config = require('../lib/config.js');
var Cache = require('../models/Cache.js');

router.get('/download-results/:cacheKey.csv', function (req, res) {
    if (config.get('allowCsvDownload')) {
        Cache.findOneByCacheKey(req.params.cacheKey, function (err, cache) {
            if (err) console.log(err);
            var filename = cache.queryName + ".csv";
            res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
            res.setHeader('Content-Type', 'text/csv');
            fs.createReadStream(cache.csvFilePath()).pipe(res);
        });
    }
});

router.get('/download-results/:cacheKey.xlsx', function (req, res) {
    if (config.get('allowCsvDownload')) {
        Cache.findOneByCacheKey(req.params.cacheKey, function (err, cache) {
            if (err) console.log(err);
            var filename = cache.queryName + ".xlsx";
            res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            fs.createReadStream(cache.xlsxFilePath()).pipe(res);
        });
    }
});

module.exports = router;