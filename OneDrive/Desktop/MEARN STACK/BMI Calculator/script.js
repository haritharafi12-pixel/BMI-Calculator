// Constants for BMI mapping (0 to 50 maps to -90deg to +90deg)
    const MIN_BMI = 0;
    const MAX_BMI = 50;
    const MIN_DEGREE = -90;
    const MAX_DEGREE = 90;
    const DEGREE_PER_UNIT = (MAX_DEGREE - MIN_DEGREE) / (MAX_BMI - MIN_BMI);

    // Function to calculate BMI and update the UI
    function calculateBMI() {
        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const needle = document.getElementById('needle');
        const bmiValueSpan = document.getElementById('bmi-value');
        const bmiStatusSpan = document.getElementById('bmi-status');

        // 1. Basic Validation
        if (!weight || !height || !age || weight <= 0 || height <= 0 || age < 2) {
            bmiValueSpan.textContent = "Error";
            bmiStatusSpan.textContent = "Please enter valid Age (2+), Weight, and Height.";
            needle.style.transform = `translateX(-50%) rotate(${MIN_DEGREE}deg)`;
            return;
        }

        // 2. BMI Calculation (Height must be in meters: cm / 100)
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters));
        const roundedBMI = bmi.toFixed(1);

        // 3. Determine BMI Status (based on WHO adult standards)
        let status = '';
        let statusColor = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            statusColor = '#94a3b8'; // Light blue/gray
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = 'Normal Weight';
            statusColor = '#4ade80'; // Green
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            status = 'Overweight';
            statusColor = '#facc15'; // Yellow/Orange
        } else if (bmi >= 30.0 && bmi <= 34.9) {
            status = 'Obesity Class I';
            statusColor = '#f97316'; // Orange
        } else if (bmi >= 35.0 && bmi <= 39.9) {
            status = 'Obesity Class II';
            statusColor = '#ef4444'; // Red
        } else { // bmi >= 40.0
            status = 'Obesity Class III (Severe)';
            statusColor = '#dc2626'; // Dark Red
        }

        // 4. Update Result Text
        bmiValueSpan.textContent = roundedBMI;
        bmiStatusSpan.textContent = `Status: ${status}`;
        
        // Change the needle color slightly to reflect the status for a premium look
        needle.style.background = statusColor;
        needle.style.boxShadow = `0 0 10px ${statusColor}`;

        // 5. Calculate Needle Rotation
        let rotation = (bmi * DEGREE_PER_UNIT) + MIN_DEGREE;

        // Clamp rotation between -90 and 90 degrees (for BMI 0 to 50)
        rotation = Math.max(MIN_DEGREE, Math.min(MAX_DEGREE, rotation));

        // Apply the rotation
        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
    }

    // Function to reset all inputs and the gauge
    function resetBMI() {
        document.getElementById('age').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('height').value = '';

        const needle = document.getElementById('needle');
        const bmiValueSpan = document.getElementById('bmi-value');
        const bmiStatusSpan = document.getElementById('bmi-status');

        // Reset needle to starting position (-90deg) and default color
        needle.style.transform = `translateX(-50%) rotate(${MIN_DEGREE}deg)`;
        needle.style.background = '#222';
        needle.style.boxShadow = 'none';

    
        bmiValueSpan.textContent = '--';
        bmiStatusSpan.textContent = 'Enter your details and click Calculate';
    }

    window.onload = () => {
        calculateBMI();
    };
