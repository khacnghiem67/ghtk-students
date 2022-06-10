import studentsRouter from './students.js';

export default (app) => {
  app.use('/students', studentsRouter);
};
