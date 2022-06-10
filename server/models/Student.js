export default class Student {
  constructor(
    stt,
    school,
    district,
    msv,
    _class,
    name,
    ngay,
    thang,
    nam,
    sex,
    address,
    ethnic,
    hktt,
    phone,
    point1,
    point2,
    point3,
    point4,
    point5,
    point_total,
    point_addition,
    point_final,
    note
  ) {
    this.school = school;
    this.district = district;
    this.msv = msv;
    this._class = _class;
    this.name = name;
    this.birth = { ngay, thang, nam };
    this.sex = sex;
    this.address = address;
    this.ethnic = ethnic;
    this.hktt = hktt;
    this.phone = phone;
    this.point = {
      point1,
      point2,
      point3,
      point4,
      point5,
      point_total,
      point_addition,
      point_final,
    };
    this.note = note;
  }
  //   getter

  //   setter
}
