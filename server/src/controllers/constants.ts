export const JSON_OBJECT = {
  levels: [
    {
      devices: [
        {
          id: 0,
          name: "pump",
          pin: 0,
          type: 3,
        },
        {
          id: 1,
          name: "temp",
          pin: 0,
          type: 4,
        },
      ],
      level: 0,
      rules: [
        {
          device: 0,
          end: [
            {
              hour: 11,
              minute: 1,
              second: 0,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 0,
          power: 60,
          ruleType: 1,
          start: [
            {
              hour: 11,
              minute: 0,
              second: 0,
            },
          ],
        },
        {
          device: 1,
          end: [
            {
              hour: 0,
              minute: 0,
              second: 0,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 1,
          power: 100,
          ruleType: 2,
          start: [
            {
              hour: 0,
              minute: 0,
              second: 0,
            },
          ],
        },
      ],
    },
    {
      devices: [
        {
          id: 0,
          name: "led_1",
          pin: 0,
          type: 1,
        },
        {
          id: 1,
          name: "fan_1",
          pin: 16,
          type: 2,
        },
        {
          id: 2,
          name: "led_2",
          pin: 17,
          type: 1,
        },
        {
          id: 3,
          name: "fan_2",
          pin: 0,
          type: 2,
        },
        {
          from: 4000,
          id: 4,
          name: "water",
          pin: 35,
          to: 4095,
          type: 5,
        },
        {
          addr: "28616408EA1E6A7E",
          from: 4000,
          id: 5,
          name: "temp1",
          pin: 5,
          to: 4095,
          type: 6,
        },
        {
          addr: "28616408EB00311E",
          from: 4000,
          id: 6,
          name: "temp2",
          pin: 5,
          to: 4095,
          type: 6,
        },
        {
          addr: "28B30646D47B1739",
          from: 280,
          id: 7,
          name: "temp3",
          pin: 5,
          to: 285,
          type: 6,
        },
      ],
      level: 1,
      rules: [
        {
          device: 0,
          end: [
            {
              hour: 0,
              minute: 9,
              second: 0,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 0,
          power: 60,
          ruleType: 3,
          start: [
            {
              hour: 0,
              minute: 6,
              second: 0,
            },
          ],
        },
        {
          device: 1,
          end: [
            {
              hour: 0,
              minute: 9,
              second: 0,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 1,
          power: 90,
          ruleType: 1,
          smoothEnd: 30,
          smoothStart: 30,
          start: [
            {
              hour: 0,
              minute: 1,
              second: 0,
            },
          ],
        },
        {
          device: 2,
          end: [
            {
              hour: 2,
              minute: 40,
              second: 30,
            },
            {
              hour: 1,
              minute: 10,
              second: 30,
            },
          ],
          index: 2,
          power: 100,
          ruleType: 1,
          runAfter: {
            day: 6,
            hour: 0,
            minute: 0,
            month: 3,
            second: 0,
            year: 2024,
          },
          runBefore: {
            day: 0,
            hour: 0,
            minute: 0,
            month: 0,
            second: 0,
            year: 0,
          },
          smoothEnd: 0,
          smoothStart: 0,
          start: [
            {
              hour: 2,
              minute: 32,
              second: 0,
            },
            {
              hour: 1,
              minute: 9,
              second: 30,
            },
          ],
        },
        {
          device: 2,
          end: [
            {
              hour: 15,
              minute: 8,
              second: 30,
            },
            {
              hour: 1,
              minute: 10,
              second: 30,
            },
          ],
          every: {
            duration: {
              hour: 0,
              minute: 0,
              second: 25,
            },
            hour: 0,
            minute: 0,
            second: 30,
          },
          index: 3,
          power: 50,
          reference: {
            device: 4,
            from: 261,
            level: 1,
            to: 270,
            type: 1,
            variable: 0,
          },
          ruleType: 3,
          runAfter: {
            day: 6,
            hour: 0,
            minute: 0,
            month: 3,
            second: 0,
            year: 2024,
          },
          runBefore: {
            day: 0,
            hour: 0,
            minute: 0,
            month: 0,
            second: 0,
            year: 0,
          },
          smoothEnd: 0,
          smoothStart: 0,
          start: [
            {
              hour: 1,
              minute: 7,
              second: 30,
            },
            {
              hour: 1,
              minute: 9,
              second: 30,
            },
          ],
        },
      ],
    },
    {
      devices: [
        {
          id: 0,
          name: "led_2",
          pin: 0,
          type: 1,
        },
        {
          id: 1,
          name: "fan_2",
          pin: 0,
          type: 2,
        },
        {
          id: 2,
          name: "fan_3",
          pin: 0,
          type: 2,
        },
      ],
      level: 2,
      rules: [
        {
          device: 0,
          end: [
            {
              hour: 0,
              minute: 0,
              second: 45,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 0,
          power: 80,
          ruleType: 1,
          start: [
            {
              hour: 0,
              minute: 0,
              second: 0,
            },
          ],
        },
        {
          device: 1,
          end: [
            {
              hour: 8,
              minute: 1,
              second: 0,
            },
          ],
          every: {
            hour: 0,
            minute: 0,
            second: 0,
          },
          index: 1,
          power: 90,
          ruleType: 1,
          start: [
            {
              hour: 7,
              minute: 0,
              second: 0,
            },
          ],
        },
      ],
    },
  ],
  system: {
    datetime: {
      date: 20240221,
      time: 150000,
    },
    forceUpdate: 0,
    postEndpoint: "http://192.168.0.103:3001/api/public/posts/test",
    timeouts: {
      getTemp: 2000,
      getTime: 1000,
      getTimeout: 5000,
      postTimeout: 0,
      updateLevels: 1000,
      updateMessages: 0,
      updateOled: 500,
      updateSensors: 2000,
    },
    updateLink: "/firmware.bin",
    version: 1,
  },
};
