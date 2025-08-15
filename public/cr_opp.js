document.addEventListener('DOMContentLoaded', function() {
    const courseSelect = document.getElementById('courseSelect');
    const branchSelect = document.getElementById('branchSelect');
    const careerSelect = document.getElementById('careerSelect');
    const careerDetails = document.getElementById('careerDetails');
    const roadmapElement = document.getElementById('roadmap');
    const freeResourcesElement = document.getElementById('freeResources');
    const paidResourcesElement = document.getElementById('paidResources');

    // Fetch courses when page loads
    fetch('/courses/courses')
        .then(response => response.json())
        .then(courses => {
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course._id;
                option.textContent = course.name;
                courseSelect.appendChild(option);
            });
        });

    // Fetch branches based on selected course
    courseSelect.addEventListener('change', function(e) {
        const courseId = e.target.value;
        if (courseId) {
            fetch(`/courses/${courseId}/branches`)
                .then(response => response.json())
                .then(branches => {
                    branchSelect.innerHTML = '<option value="">Select Branch</option>';
                    branchSelect.disabled = false;
                    branches.forEach(branch => {
                        const option = document.createElement('option');
                        option.value = branch._id;
                        option.textContent = branch.name;
                        branchSelect.appendChild(option);
                    });
                });
        } else {
            branchSelect.disabled = true;
        }
    });

    // Fetch careers based on selected branch
    branchSelect.addEventListener('change', function(e) {
        const branchId = e.target.value;
        const courseId = courseSelect.value;
        if (branchId) {
            fetch(`/courses/${courseId}/branches/${branchId}/careers`)
                .then(response => response.json())
                .then(careers => {
                    careerSelect.innerHTML = '<option value="">Select Career</option>';
                    careerSelect.disabled = false;
                    careers.forEach(career => {
                        const option = document.createElement('option');
                        option.value = career._id;
                        option.textContent = career.title;
                        careerSelect.appendChild(option);
                    });
                });
        } else {
            careerSelect.disabled = true;
        }
    });

    // Fetch career details based on selected career
    careerSelect.addEventListener('change', function(e) {
        const careerId = e.target.value;
        const branchId = branchSelect.value;
        const courseId = courseSelect.value;
        if (careerId) {
            fetch(`/courses/${courseId}/branches/${branchId}/careers/${careerId}`)
                .then(response => response.json())
                .then(career => {
                    careerDetails.style.display = 'block';
                    roadmapElement.innerHTML = career.roadmap;
                    freeResourcesElement.innerHTML = career.freeResources.map(resource => `<li><a href="${resource.url}" target="_blank">${resource.name}</a></li>`).join('');
                    paidResourcesElement.innerHTML = career.paidResources.map(resource => `<li><a href="${resource.url}">${resource.name}</a></li>`).join('');
                });
        }
    });
});
