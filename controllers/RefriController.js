var refri = require('../models/refri');
var debug = require('debug')('refrigerador:refri_controller');

module.exports.getOne = (req, res, next) => {
    debug("Search one", req.params);
    refri.findOne({
            marca: req.params.marca
        }, "-login_count")
        .then((FoundRefri) => {
            debug("Found Refri", FoundRefri);
            if (FoundRefri) {
                return res.status(200).json(FoundRefri);
            } else {
                return res.status(400).json(null);
            }
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 5,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Refri List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    refri.find({}, "-login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((refris) => {
            debug("Found Refri", refris);
            return res.status(200).json(refris)
        }).catch(err => {
            next(err);
        });
}

module.exports.register = (req, res, next) => {
debug("new refri", {
    body: req.body
});
refri.findOne({
        marca: req.body.marca
    }, "-login_count")
    .then((FoundRefri) => {
        if (FoundRefri) {
            debug("refrigerador ya existente")
            throw new Error(`refrigerador ya existente ${req.body.marca}`);
        } else {
            let newrefri = new refri({
                marca: req.body.marca,
                color: req.body.color || "",
                tamaño: req.body.tamaño || "",
                puertas: req.body.puertas || ""
            });
            return newrefri.save();
        }
    }).then(refri => {
        return res
            .header('Location', '/refris/' + refri.marca)
            .status(201)
            .json({
                marca: refri.marca
            });
    }).catch(err => {
        next(err);
    });
}


module.exports.update = (req, res, next) => {
    debug("Update refri", {
        marca: req.params.marca,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
            marca: req.params.marca
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete refri", {
        marca: req.params.marca,
    });

    refri.findOneAndDelete({marca: req.params.marca})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}