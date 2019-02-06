var booksModel = require('../models/booksModel.js');
var authorModel = require('../models/authorModel.js');


module.exports = {

 
    list: function (req, res) {
        booksModel.find(function (err, bookss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting books.',
                    error: err
                });
            }
            return res.json(bookss);
        }).populate('authors');
    },

 
    show: function (req, res) {
        var id = req.params.id;
        booksModel.findOne({_id: id}, function (err, books) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting books.',
                    error: err
                });
            }
            if (!books) {
                return res.status(404).json({
                    message: 'No such books'
                });
            }
            return res.json(books);
        }).populate('authors');
    },

    create: function (req, res) {
        var books = new booksModel({
			name : req.body.name,
            year : req.body.year,
            authors: req.body.authors,
			shortDescription : req.body.shortDescription

        });
        books.save(function (err, books) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating books',
                    error: err
                });
            }
            return res.status(201).json(books);
        });
    },

   
    update: function (req, res) {
        var id = req.params.id;
        booksModel.findOne({_id: id}, function (err, books) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting books',
                    error: err
                });
            }
            if (!books) {
                return res.status(404).json({
                    message: 'No such books'
                });
            }

            books.name = req.body.name ? req.body.name : books.name;
			books.year = req.body.year ? req.body.year : books.year;
			books.shortDescription = req.body.shortDescription ? req.body.shortDescription : books.shortDescription;
			
            books.save(function (err, books) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating books.',
                        error: err
                    });
                }

                return res.json(books);
            });
        });
    },

  
    remove: function (req, res) {
        var id = req.params.id;
        booksModel.findByIdAndRemove(id, function (err, books) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the books.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
