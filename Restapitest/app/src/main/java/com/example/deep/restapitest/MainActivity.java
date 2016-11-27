package com.example.deep.restapitest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.deep.restapitest.model.Booking;
import com.example.deep.restapitest.service.APIService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    EditText firstName;
    EditText lastName;
    EditText CheckinFrom;
    EditText CheckinTo;
    EditText phone;

    Button btnBook;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        firstName = (EditText) findViewById(R.id.textFirstname);
        lastName = (EditText) findViewById(R.id.textLastname);
        CheckinFrom = (EditText) findViewById(R.id.checkinfrom);
        CheckinTo = (EditText) findViewById(R.id.checkinto);
        phone = (EditText) findViewById(R.id.phone);
        btnBook = (Button) findViewById(R.id.btn_Book);

//        btnBook.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Retrofit retrofit = new Retrofit.Builder()
//                        .baseUrl("")
//                        .addConverterFactory(GsonConverterFactory.create())
//                        .build();
//
//                APIService service =  retrofit.create(APIService.class);
//                Call<List<Booking>> call = service.getBoookingDetails();
//
//                call.enqueue(new Callback<List<Booking>>() {
//                    @Override
//                    public void onResponse(Response<List<Booking>> response, Retrofit retrofit) {
//
//                        List<Booking> bookings = response.body();
//
//                        String details = "";
//
//                        for(int i=0; i<bookings.size(); i++){
//                            String bookingid = bookings.get(i).getMobile();
//
//                            details += " \n\n bookingid: " + bookingid;
//                        }
//
//                    }
//
//                    @Override
//                    public void onFailure(Throwable t) {
//
//                    }
//                });
//            }
//
//
//        });

        btnBook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setreservation();
            }
        });

    }


    private void setreservation() {
        Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("http://localhost:5000/")
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();



                Booking booking = new Booking();
                booking.setFirstname(firstName.getText().toString());
                booking.setLastname(lastName.getText().toString());
                booking.setCheckinFrom(CheckinFrom.getText().toString());
                booking.setCheckinTo(CheckinTo.getText().toString());
                booking.setMobile(phone.getText().toString());

                 APIService service =  retrofit.create(APIService.class);

                Call<Booking> call = service.makereservation(booking.getLastname(),booking.getFirstname(),booking.getCheckinFrom(),booking.getCheckinTo(),booking.getMobile());


                    call.enqueue(new Callback<Booking>() {
                        @Override
                        public void onResponse(Call<Booking> call, Response<Booking> response) {

                        }

                        @Override
                        public void onFailure(Call<Booking> call, Throwable t) {

                        }
                });

    }
}
