const Project = require('../models/projectStruct');
const fakeData = require('../services/fakeData');


exports.getProjects = (req, res) => {
    Project.find({})
        .sort({'startDate': 1})
        .exec((err, allPortfolios) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(allPortfolios);
        });
}


exports.saveProjects = (req,res) => {
    Project.deleteMany({}, (err, res) => {
        if (err) console.log(err);
        else console.log('Collection emptied');
    });
    const data = fakeData.dummyData;
    data.map((project) => {
        const userId = "google-oauth2|102294616511669021985";
        const proj = new Project(project);
        proj.userId = userId;
        proj.save((err, createdPortfolio) => {
            if (err) {
                console.log(err);
            }else {
                console.log(createdPortfolio._id);
            }
        });
    })
    console.log('data stored');
    return res.json({message : 'data stored'});
}

