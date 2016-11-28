package com.example.deep.restapitest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

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
    EditText type;

    //Creating Strings for request
    String fname;
    String lname;
    String startdate;
    String enddate;
    String mobile;
    String room_type;

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
        type = (EditText)findViewById(R.id.room_type);

        btnBook = (Button) findViewById(R.id.btn_Book);


        //Mapping Strings for request
        fname = firstName.getText().toString();
        lname = lastName.getText().toString();
        startdate = CheckinFrom.getText().toString();
        enddate = CheckinTo.getText().toString();
        mobile = phone.getText().toString();
        room_type = type.getText().toString();


        btnBook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "Set Reservation Called", Toast.LENGTH_LONG).show();
                book();
        }
        });

    }

    public void book(){

        Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://localhost:5000/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

        APIService service = retrofit.create(APIService.class);

        Booking booking = new Booking(startdate,enddate,room_type,fname,lname,mobile);

        Call<Booking> call = service.makereservation(booking);
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
