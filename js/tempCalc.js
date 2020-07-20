var enthalpy = {
    "H2": -241810,
    "CO": -283000,
    "CH4": -802820,
    "C2H2": -1257110,
    "C2H5OH": -1234830,
    "C2H6": -1428030,
    "C3H8": -2044040
};

var heat_capacity = {
    //        a         bT           cT^-2      dT^2    eT^3
    "O2":[30.24009, 0.00420486, -1.88637E-05,     0,     0],
    "CO2":[45.34767, 0.00871719, -9.61467E-05,    0,     0],
    "H2O":[28.8357, 0.0120495, 1.00551E-05,       0,     0],
    "N2":[27.2568, 0.00492783, 0.000003324,       0,     0],
    "H2":[26.99919, 0.00350682, 6.8973E-06,       0,     0],
    "CO":[28.05456, 0.00462867, -2.5761E-06,      0,     0],
    "CH4":[14.14362, 0.07546311, 0,    -1.79828E-05,     0],
    "C2H2":[50.95692, 0.01622112, -0.000107947,   0,     0],
    "C2H5OH":[29.23458, 0.16620831, 0, -4.98766E-05,     0],
    "C2H6":[9.39861, 0.15975975,    0, -4.62119E-05,     0],
    "C3H8":[10.08003, 0.23920335,   0, -7.33274E-05,     0],
    "C4H10":[16.07985, 0.30676365,  0, -9.47506E-05,     0],
    "C8H16":[35.93244, 0.5398176,   0,  -0.00017053,     0]
};

// room temp in K
var T0 = 298;

var subscripts = {
    //    n  m  l   T0
    "H2":[0, 2, 0, 3000],
    "CO":[1, 0, 1, 3000],
    "CH4":[1, 4, 0, 3000],
    "C2H2":[2, 2, 0, 3000],
    "C2H5OH":[2, 6, 1, 3000],
    "C2H6":[2, 6, 0, 3000],
    "C3H8":[3, 8, 0, 3000]
};

var u = 1;

function findTemp(){
    // get combustible from dropdown menu
    oxidant_ratio = Number(document.getElementById("oxidantratio").innerHTML);
    combustible = document.getElementById("combustible").value;

    // get all data for combustible
    hc = heat_capacity[combustible];

    // gets chemical subscripts of combustible
    sub = subscripts[combustible];
    n = sub[0];
    m = sub[1];
    l = sub[2];

    // initial guess for combustible
    r0 = sub[3];

    // get N2/O2 ratio from user input (0-3.762)
    w = Number(document.getElementById("n2o2ratio").innerHTML);

    u = oxidant_ratio + l/2;
    st = n + m/4;

    // y*CO2 + z*H2O + s*CnHmOl + t*O2 + w*N2
    var y = 0;
    var z = 0;
    var s = 0;
    var t = 0;

    if (u == st){
        // stoichiometric
        y = n;
        z = m/2;
    }
    else if (u > st){
        // excess oxidant
        y = n;
        z = m/2;
        t = u - st;
    }
    else{
        // lack of oxidant
        s = (4*(n-u)+m)/(4*n+m);
        z = 2*(u+n*(s-1));
        y = u - 0.5*z;
    }

    // coefficient placeholders in f(T)
    a = [0, 1, 2, 3, 4, 5];

    // -c
    a[0] = -(y*heat_capacity["CO2"][2]+z*heat_capacity["H2O"][2]+s*heat_capacity[combustible][2]+t*heat_capacity["O2"][2]+w*heat_capacity["N2"][2]);
 
    // a
    a[2] = y*heat_capacity["CO2"][0]+z*heat_capacity["H2O"][0]+s*heat_capacity[combustible][0]+t*heat_capacity["O2"][0]+w*heat_capacity["N2"][0];
 
    // 0.5*b
    a[3] = 0.5*(y*heat_capacity["CO2"][1]+z*heat_capacity["H2O"][1]+s*heat_capacity[combustible][1]+t*heat_capacity["O2"][1]+w*heat_capacity["N2"][1]);

    // 0.333333*d
    a[4] = (y*heat_capacity["CO2"][3]+z*heat_capacity["H2O"][3]+s*heat_capacity[combustible][3]+t*heat_capacity["O2"][3]+w*heat_capacity["N2"][3])/3;

    // 0.25*e
    a[5] = 0.25*(y*heat_capacity["CO2"][4]+z*heat_capacity["H2O"][4]+s*heat_capacity[combustible][4]+t*heat_capacity["O2"][4]+w*heat_capacity["N2"][4]);

    // A
    a[1] = (1-s)*enthalpy[combustible]-T0*(a[2]+T0*(a[3]+T0*(a[4]+T0*a[5])))-a[0]/T0;
    
    Tf = newt_p5(a, r0);

    Tf = Tf.toFixed(4);
    document.getElementById("temp_display").innerHTML = Tf.toString() + " K";

    setColor(Tf);
};

function newt_p5(a, r0){
    // uses newton's method to solve for root (all coefficients are in array a as shown above)
    eps = 1.e-2;
    x = r0;
    y = ((((a[5]*x+a[4])*x+a[3])*x+a[2])*x+a[1])*x+a[0];

    while(Math.abs(y) > eps){
        yp = (((5*a[5]*x+4*a[4])*x+3*a[3])*x+2*a[2])*x+a[1];
        x = x - y/yp;
        y = ((((a[5]*x+a[4])*x+a[3])*x+a[2])*x+a[1])*x+a[0];
    }

    return x;
};

function change_n2o2ratio(value){
    num = Number(value).toFixed(3);
    document.getElementById("n2o2ratio").innerHTML = num.toString();
};

function change_oxratio(value){
    num = Number(value).toFixed(2);
    document.getElementById("oxidantratio").innerHTML = num.toString();
};