package com.example.deep.restapitest.service;

import com.example.deep.restapitest.model.Booking;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;


/**
 * Created by Deep on 11/26/16.
 */

public interface APIService {

//    @GET("")
//    Call<List<Booking>> getBoookingDetails();

    @POST("todo/api/v1.0/tasks")
//    Call<Booking> makereservation(@Field("FirstName") String firstname,@Field("LastName") String lastname, @Field("Phone") String phone, @Field("CheckIn") String Checkin, @Field("CheckOut") String Checkout);
    Call<Booking> makereservation(@Body Booking booking);
}
