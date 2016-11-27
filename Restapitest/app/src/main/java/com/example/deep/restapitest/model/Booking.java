package com.example.deep.restapitest.model;

/**
 * Created by Deep on 11/26/16.
 */

public class Booking {

    private String firstname;
    private String lastname;
    private String mobile;
    private String CheckinFrom;
    private String CheckinTo;

//    public Booking(String firstname, String lastname, String mobile, String checkinFrom, String checkinTo) {
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.mobile = mobile;
//        CheckinFrom = checkinFrom;
//        CheckinTo = checkinTo;
//    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCheckinTo() {
        return CheckinTo;
    }

    public void setCheckinTo(String checkinTo) {
        CheckinTo = checkinTo;
    }

    public String getCheckinFrom() {
        return CheckinFrom;
    }

    public void setCheckinFrom(String checkinFrom) {
        CheckinFrom = checkinFrom;
    }
}
