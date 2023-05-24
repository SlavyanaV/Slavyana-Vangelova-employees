const dayjs = require('dayjs');
const minMax = require('dayjs/plugin/minMax');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

export const fileParser = (fileData) => {
  const projectEmployees = createProjectsObject(fileData);

  const pairs = extractPairs(projectEmployees);

  const sortedPairs = Object.values(pairs).sort(
    (firstPair, secondPair) => secondPair.totalDays - firstPair.totalDays
  );

  const highestDays = sortedPairs[0].totalDays;

  const highestDaysPairs = sortedPairs.filter(
    (pair) => pair.totalDays === highestDays
  );

  const rows = highestDaysPairs
    .flatMap((pair) =>
      pair.projects.map((project) => ({
        projectId: project.projectId,
        daysWorked: project.daysWorked,
        firstEmployeeId: pair.firstEmployee,
        secondEmployeeId: pair.secondEmployee,
      }))
    )
    .map((item, index) => ({ ...item, id: index }));

  return rows;
};

const createProjectsObject = (fileData) =>
  fileData.reduce((projectObj, rowData) => {
    const [employeeId, projectId, start, end] = rowData;
    const startDate = dayjs(start);
    const endDate = end && end !== 'NULL' ? dayjs(end) : dayjs();
    projectObj[projectId] = projectObj[projectId] || [];
    projectObj[projectId].push({ employeeId, startDate, endDate });
    return projectObj;
  }, {});

const extractPairs = (projectEmployees) => {
  const pairs = {};

  Object.keys(projectEmployees).forEach((projectId) => {
    const employees = projectEmployees[projectId];

    for (let i = 0; i < employees.length - 1; i++) {
      const firstEmployee = employees[i];

      for (let j = i + 1; j < employees.length; j++) {
        const secondEmployee = employees[j];

        const workedTogether =
          (firstEmployee.endDate.isAfter(secondEmployee.startDate) &&
            firstEmployee.endDate.isSameOrBefore(secondEmployee.endDate)) ||
          (secondEmployee.endDate.isAfter(firstEmployee.startDate) &&
            secondEmployee.endDate.isSameOrBefore(firstEmployee.endDate));

        if (workedTogether) {
          const firstDate = dayjs.max(
            firstEmployee.startDate,
            secondEmployee.startDate
          );

          const secondDate = dayjs.min(
            firstEmployee.endDate,
            secondEmployee.endDate
          );

          const daysWorked = secondDate.diff(firstDate, 'day');
          const pair = `${firstEmployee.employeeId}-${secondEmployee.employeeId}`;

          const currentTotalDays = +pairs[pair]?.totalDays || 0;

          pairs[pair] = {
            firstEmployee: firstEmployee.employeeId,
            secondEmployee: secondEmployee.employeeId,
            totalDays: currentTotalDays + daysWorked,
            projects: [
              ...(pairs[pair]?.projects || []),
              { projectId, daysWorked },
            ],
          };
        }
      }
    }
  });

  return pairs;
};
