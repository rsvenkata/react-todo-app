const Notes = require('../models/noteModel')
const Users = require('../models/userModel')

const noteCtrl = {
    getNotes: async (req, res) =>{
        try {

          if (req.user.role === 1)
          res.json(await Notes.find())
            else
            res.json(await Notes.find({user_id: req.user.id}))
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newNote.save()
            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            res.json({msg: "Updated a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNote: async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = noteCtrl