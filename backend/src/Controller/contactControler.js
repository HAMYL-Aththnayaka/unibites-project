import contactModel from '../Models/contactModel.js';

export const addTo = async (req, res) => {
  try {
    const contact = new contactModel({
      name: req.body.name,
      registration: req.body.registration,
      faculty: req.body.faculty,
      reason: req.body.reason,
      recomendation: req.body.recomendation,
      scholership: req.body.scholership,
    });

    await contact.save();

    res.status(200).send({
      success: true,
      alert: 'Contact Added Successfully',
    });
  } catch (err) {
    console.log(err.toString());
    res.status(500).send({
      success: false,
      alert: err.toString(),
    });
  }
};

export const viewTo = async (req, res) => {
  try {
    const result = await contactModel.find({});

    if (result.length > 0) {
      res.status(200).send({
        success: true,
        Data: result,
      });
    } else {
      res.status(200).send({
        success: false,
        Alert: 'No Data Found',
      });
    }
  } catch (err) {
    console.log(err.toString());
    res.status(500).send({
      success: false,
      alert: err.toString(),
    });
  }
};

export const viewRemove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await contactModel.findByIdAndDelete(id);

    if (deleted) {
      res.status(200).send({
        success: true,
        alert: 'Contact deleted successfully',
      });
    } else {
      res.status(404).send({
        success: false,
        alert: 'Contact not found',
      });
    }
  } catch (err) {
    console.log(err.toString());
    res.status(500).send({
      success: false,
      alert: err.toString(),
    });
  }
};
