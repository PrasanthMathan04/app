import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class LoginService{
    
    title:string;
    tots:string;
    id:string;
    psgstudweb:string;
    psgcolweb:string;
    psgbridge:string;
    semone:string;
    semonecredits:string;
    semtwo:string;
    semtwocredits:string;
    semthree:string;
    semthreecredits:string;
    semfour:string;
    semfourcredits:string;
    semfive:string;
    semfivecredits:string;
    semsix:string;
    semsixcredits:string;
    timetable:string;
    syllabus:string;
    pdfpage:string;
    drawname:string;
    drawicon:string;
    website:string;

    setTitle(value)
    {
        this.title = value;
    }
    setTots(value)
    {
        this.tots=value;
    }
    setId(value)
    {
        this.id=value;
    }
    setPsgStud(value)
    {
       this.psgstudweb=value;
    }
    setPsgWeb(value)
    {
        this.psgcolweb=value;
    }
    setPsgBridge(value)
    {
        this.psgbridge=value;
    }
    setSemOne(value)
    {
        this.semone=value;
    }
    setSemOneCredits(value)
    {
       this.semonecredits = value;
    }
    setSemTwo(value)
    {
        this.semtwo=value;
    }
    setSemTwoCredits(value)
    {
       this.semtwocredits = value;
    }
    setSemThree(value)
    {
        this.semthree=value;
    }
    setSemThreeCredits(value)
    {
       this.semthreecredits = value;
    }
    setSemFour(value)
    {
        this.semfour=value;
    }
    setSemFourCredits(value)
    {
       this.semfourcredits = value;
    }
    setSemFive(value)
    {
        this.semfive=value;
    }
    setSemFiveCredits(value)
    {
       this.semfivecredits = value;
    }
    setSemSix(value)
    {
        this.semsix=value;
    }
    setSemSixCredits(value)
    {
       this.semsixcredits = value;
    }
    setTimeTable(value)
    {
        this.timetable = value;
    }
    setSyllabusPath(value)
    {
        this.syllabus = value;
    }
    setPdfPage(value)
    {
        this.pdfpage = value;
    }
    setDrawName(value)
    {
        this.drawname  = value;
    }
    setDrawIcon(value)
    {
        this.drawicon = value;
    }
    setWeb(value)
    {
        this.website = value;
    }
    

    getTitle()
    {
        return this.title;
    }
    getTots()
    {
        return this.tots;
    }
    getId()
    {
        return this.id;
    }
    getPsgStud()
    {
       return this.psgstudweb;
    }
    getPsgWeb()
    {
       return this.psgcolweb;
    }
    getPsgBridge()
    {
        return this.psgbridge;
    }
    getSemOne()
    {
        return this.semone;
    }
    getSemOneCredits()
    {
        return this.semonecredits;
    }
    getSemTwo()
    {
        return this.semtwo;
    }
    getSemTwoCredits()
    {
        return this.semtwocredits;
    }
    getSemThree()
    {
        return this.semthree;
    }
    getSemThreeCredits()
    {
        return this.semthreecredits;
    }
    getSemFour()
    {
        return this.semfour;
    }
    getSemFourCredits()
    {
        return this.semfourcredits;
    }
    getSemFive()
    {
        return this.semfive;
    }
    getSemFiveCredits()
    {
        return this.semfivecredits;
    }
    getSemSix()
    {
        return this.semsix;
    }
    getSemSixCredits()
    {
        return this.semsixcredits;
    }
    getTimeTable()
    {
        return this.timetable;
    }
    getSyllabusPath()
    {
        return this.syllabus;
    }
    getPdfPath()
    {
        return this.pdfpage;
    }
    getPdfPage()
    {
        return this.pdfpage;
    }
    getDrawIcon()
    {
        return this.drawicon;
    }
    getDrawName()
    {
       return this.drawname;
    }
    getWeb()
    {
        return this.website;
    }

    
}