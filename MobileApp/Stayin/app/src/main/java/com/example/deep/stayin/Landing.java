package com.example.deep.stayin;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.widget.Button;

public class Landing extends AppCompatActivity {

    private Button getstarted;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_landing);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        getstarted = (Button) findViewById(R.id.btn_getstarted);


//        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
//        fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
//            }
//        });


//        View.OnClickListener btnListener = new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent LoginIntent = new Intent(getApplicationContext(), MainActivity.class);
//                startActivity(LoginIntent);
//            }
//        };
//        getstarted.setOnClickListener(btnListener);

    }

}
