var authorModel = require('../models/authorModel.js');


module.exports = {

    list: function (req, res) {
        authorModel.find(function (err, authors) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author.',
                    error: err
                });
            }
            return res.json(authors);
        });
    },


    show: function (req, res) {
        var id = req.params.id;
        authorModel.findOne({_id: id}, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author.',
                    error: err
                });
            }
            if (!author) {
                return res.status(404).json({
                    message: 'No such author'
                });
            }
            return res.json(author);
        });
    },

 
    create: function (req, res) {
        var author = new authorModel({
			name : req.body.name

        });

        author.save(function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating author',
                    error: err
                });
            }
            return res.status(201).json(author);
        });
    },


    update: function (req, res) {
        var id = req.params.id;
        authorModel.findOne({_id: id}, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author',
                    error: err
                });
            }
            if (!author) {
                return res.status(404).json({
                    message: 'No such author'
                });
            }

            author.name = req.body.name ? req.body.name : author.name;
			
            author.save(function (err, author) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating author.',
                        error: err
                    });
                }

                return res.json(author);
            });
        });
    },


    remove: function (req, res) {
        var id = req.params.id;
        authorModel.findByIdAndRemove(id, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the author.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
