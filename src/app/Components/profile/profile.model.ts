

export class Profile{
    //public user: number;
    public profilepic:string;
    public Fullname:string;
    public Mobile:string;
    public DOB:string;
    public Address:string;
    public University:string;
    public Faculty:string;
    public College_Department:string;
    public Expected_Year_Of_Graduation:string;
    public College_id:string;
    public Em_contact_name:string;
    public Em_contact_mobile:string;
    public Em_contact_relation:string;
    public National_id:string;
    public National_id_front:string;
    public National_id_back:string;
    public Passport_id:string;
    public Passport_id_im:string;

    constructor(pic:string,Fullname:string,
         Mobile:string,University:string,Faculty:string,College_id:string,College_Department:string,Expected_Year_Of_Graduation:string,
         Address:string,  DOB:string,National_id:string,National_id_front:string,National_id_back:string,Passport_id:string,
         Passport_id_im:string, Em_contact_name:string, Em_contact_mobile:string,Em_contact_relation:string
        ){
        //this.user =user;
        this.profilepic= pic;
        this.Address=Address;
        this.College_Department=College_Department;
        this.Fullname=Fullname;
        this.College_id=College_id;
        this.DOB=DOB;
        this.University=University;
        this.Em_contact_mobile=Em_contact_mobile;
        this.Em_contact_name =Em_contact_name;
        this.Expected_Year_Of_Graduation=Expected_Year_Of_Graduation;
        this.National_id=National_id;
        this.Passport_id =Passport_id;
        this.Passport_id_im = Passport_id_im;
        this.Em_contact_relation = Em_contact_relation;
        this.Faculty = Faculty;
        this.Mobile =Mobile;
        this.National_id_front =National_id_front;
        this.National_id_back = National_id_back;
    }
}