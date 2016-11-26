package com.example.deep.stayin;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import com.facebook.accountkit.AccountKit;

public class HomeActivity extends AppCompatActivity {

    Button getStarted;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AccountKit.initialize(getApplicationContext());
        setContentView(R.layout.activity_home);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        if (AccountKit.getCurrentAccessToken() != null) {
            goToMyLoggedInActivity();
        }

        getStarted = (Button) findViewById(R.id.btn_getstarted);
        getStarted.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent LoginIntent = new Intent(getApplicationContext(), Login.class);
                startActivity(LoginIntent);
            }
        });
    }

    private void goToMyLoggedInActivity() {
        final Intent intent = new Intent(this, Landing.class);
        this.startActivity(intent);
    }

}
