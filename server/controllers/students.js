import formidable from 'formidable';
import XLSX from 'xlsx';
import { getDb } from '../db/db.js';
import Student from '../models/Student.js';

const studentsCtrl = {
  async importStudents(req, res) {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        /* grab the first file */
        const f = Object.entries(files)[0][1];
        const path = f.filepath;
        const workbook = XLSX.readFile(path);

        /* DO SOMETHING WITH workbook HERE */
        const studentsList = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { defval: '' }
        );

        // find db start index
        let start;
        for (let i = 0; i < studentsList.length; i++) {
          const firstField = Object.keys(studentsList[i])[0];
          if (
            typeof studentsList[i][firstField] === 'number' &&
            studentsList[i][firstField] === 1
          ) {
            start = i;
            break;
          }
        }
        // insert to db

        const listToInsert = studentsList
          .slice(start)
          .map((student) => new Student(...Object.values(student)));

        getDb()
          .collection('students')
          .insertMany(listToInsert, function (err, _res) {
            if (err) return res.status(400).json({ status: false });
            return res.status(200).json({ status: true });
          });
      });
    } catch (e) {
      return res.status(500).json({ status: false, message: e.message });
    }
  },
  async getAllStudents(req, res) {
    try {
      // get all students
      getDb()
        .collection('students')
        .find({})
        .toArray(function (err, result) {
          if (err) return res.status(400).json({ status: false });
          return res.status(200).json({ status: true, students: result });
        });
    } catch (e) {
      return res.status(500).json({ status: false, message: e.message });
    }
  },
  async searchStudents(req, res) {
    try {
      const { msv, name } = req.query;

      // create query
      let query = {};

      if (msv) {
        query['msv'] = new RegExp(msv, 'i'); // case - insensitive
      } else if (name) {
        query['name'] = new RegExp(name, 'i'); // case - insensitive
      }

      // filter
      getDb()
        .collection('students')
        .find(query)
        .toArray(function (err, result) {
          if (err) return res.status(400).json({ status: false });
          return res.status(200).json({ status: true, students: result });
        });
    } catch (e) {
      return res.status(500).json({ status: false, message: e.message });
    }
  },
};

export default studentsCtrl;
