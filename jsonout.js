const fs = require("fs")

const x = {
  "context": {
    "location": {
      "country": {
        "code": "IND"
      },
      "city": {
        "code": "std:011"
      }
    },
    "domain": "ONDC:TRV11",
    "action": "on_status",
    "version": "2.0.0",
    "bap_id": "api.example-bap.com",
    "bap_uri": "https://api.example-bap.com/ondc/metro",
    "bpp_id": "api.example-bpp.com",
    "bpp_uri": "https://api.example-bpp.com/ondc/metro",
    "transaction_id": "6f339232-2bc3-44d2-915c-30d2b053ce1d",
    "message_id": "fde8b8b6-c2e5-49f7-b254-720843d528bd",
    "timestamp": "2021-03-23T10:00:40.065Z",
    "ttl": "PT30S"
  },
  "message": {
    "order": {
      "id": "077b248f",
      "status": "COMPLETE",
      "items": [
        {
          "id": "I1",
          "descriptor": {
            "name": "Single Journey Ticket",
            "code": "SJT"
          },
          "category_ids": [
            "C1"
          ],
          "price": {
            "currency": "INR",
            "value": "60"
          },
          "quantity": {
            "selected": {
              "count": 2
            }
          },
          "fulfillment_ids": [
            "F1",
            "F2"
          ],
          "time": {
            "label": "Validity",
            "duration": "PT2D"
          }
        }
      ],
      "provider": {
        "id": "P1",
        "descriptor": {
          "name": "Delhi Metro Rail Limited",
          "images": [
            {
              "url": "https://delhimetrorail.com/logos/logo.ico"
            }
          ]
        },
        "time": {
          "range": {
            "start": "2023-09-14T05:30:00.000Z",
            "end": "2023-09-14T23:30:00.000Z"
          }
        }
      },
      "fulfillments": [
        {
          "id": "F1",
          "type": "TRIP",
          "stops": [
            {
              "type": "START",
              "location": {
                "descriptor": {
                  "name": "Shaheed Sthal(New Bus Adda)",
                  "code": "SHAHEED_STHAL"
                },
                "gps": "28.686576, 77.441632"
              },
              "id": "1"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 1"
              },
              "location": {
                "descriptor": {
                  "name": "Hindon River",
                  "code": "HINDON_RIVER"
                },
                "gps": "28.686176, 77.442632"
              },
              "id": "2",
              "parent_stop_id": "1"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 2"
              },
              "location": {
                "descriptor": {
                  "name": "Arthala"
                },
                "gps": "28.181276, 77.442332"
              },
              "id": "3",
              "parent_stop_id": "2"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 3"
              },
              "location": {
                "descriptor": {
                  "name": "Mohan Nagar"
                },
                "gps": "28.981276, 77.772332"
              },
              "id": "4",
              "parent_stop_id": "3"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 4"
              },
              "location": {
                "descriptor": {
                  "name": "Shyam Park"
                },
                "gps": "28.620976, 77.046732"
              },
              "id": "5",
              "parent_stop_id": "4"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 5"
              },
              "location": {
                "descriptor": {
                  "name": "Major Mohit Sharma Rajendra Nagar"
                },
                "gps": "28.120976, 77.946732"
              },
              "id": "6",
              "parent_stop_id": "5"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 6"
              },
              "location": {
                "descriptor": {
                  "name": "Raj Bagh"
                },
                "gps": "28.677076, 77.346632"
              },
              "id": "7",
              "parent_stop_id": "6"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 7"
              },
              "location": {
                "descriptor": {
                  "name": "Shaheed Nagar"
                },
                "gps": "28.617076, 77.146632"
              },
              "id": "8",
              "parent_stop_id": "7"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 8"
              },
              "location": {
                "descriptor": {
                  "name": "Dilshad Garden"
                },
                "gps": "28.917076, 77.146632"
              },
              "id": "9",
              "parent_stop_id": "8"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 9"
              },
              "location": {
                "descriptor": {
                  "name": "Jhilmil"
                },
                "gps": "28.897076, 77.146632"
              },
              "id": "10",
              "parent_stop_id": "9"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 10"
              },
              "location": {
                "descriptor": {
                  "name": "Mansarovar Park"
                },
                "gps": "28.117076, 77.116632"
              },
              "id": "11",
              "parent_stop_id": "10"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 11"
              },
              "location": {
                "descriptor": {
                  "name": "Shahdara"
                },
                "gps": "28.127076, 77.416632"
              },
              "id": "12",
              "parent_stop_id": "11"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 12"
              },
              "location": {
                "descriptor": {
                  "name": "Welcome"
                },
                "gps": "28.217076, 77.216632"
              },
              "id": "13",
              "parent_stop_id": "12"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 13"
              },
              "location": {
                "descriptor": {
                  "name": "Seelampur"
                },
                "gps": "28.327076, 77.416632"
              },
              "id": "14",
              "parent_stop_id": "13"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 14"
              },
              "location": {
                "descriptor": {
                  "name": "Shastri Park"
                },
                "gps": "28.427076, 77.446632"
              },
              "id": "15",
              "parent_stop_id": "14"
            },
            {
              "type": "TRANSIT_STOP",
              "instructions": {
                "name": "Stop 15",
                "short_desc": "Please Change here for Yellow Line"
              },
              "location": {
                "descriptor": {
                  "name": "Kashmere Gate"
                },
                "gps": "28.738426, 77.139922"
              },
              "id": "16",
              "parent_stop_id": "15"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 16"
              },
              "location": {
                "descriptor": {
                  "name": "Civil Lines"
                },
                "gps": "28.627076, 77.646632"
              },
              "id": "17",
              "parent_stop_id": "16"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 17"
              },
              "location": {
                "descriptor": {
                  "name": "Vidhan Sabha"
                },
                "gps": "28.727076, 77.746632"
              },
              "id": "18",
              "parent_stop_id": "17"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 18"
              },
              "location": {
                "descriptor": {
                  "name": "Vishwavidyalaya"
                },
                "gps": "28.827076, 77.846632"
              },
              "id": "19",
              "parent_stop_id": "18"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 19"
              },
              "location": {
                "descriptor": {
                  "name": "Guru Tegh Bahadur Nagar"
                },
                "gps": "28.927076, 77.946632"
              },
              "id": "20",
              "parent_stop_id": "19"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 20"
              },
              "location": {
                "descriptor": {
                  "name": "Model Town"
                },
                "gps": "28.217076, 77.496632"
              },
              "id": "21",
              "parent_stop_id": "20"
            },
            {
              "type": "END",
              "location": {
                "descriptor": {
                  "name": "Azadpur",
                  "code": "AZADPUR"
                },
                "gps": "28.707358, 77.180910"
              },
              "id": "22",
              "parent_stop_id": "21"
            }
          ],
          "vehicle": {
            "category": "METRO"
          },
          "tags": [
            {
              "descriptor": {
                "code": "TICKET_INFO"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "NUMBER"
                  },
                  "value": "8ed21b6f"
                }
              ]
            }
          ]
        },
        {
          "id": "F2",
          "type": "TRIP",
          "stops": [
            {
              "type": "START",
              "location": {
                "descriptor": {
                  "name": "Shaheed Sthal(New Bus Adda)",
                  "code": "SHAHEED_STHAL"
                },
                "gps": "28.686576, 77.441632"
              },
              "id": "1"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 1"
              },
              "location": {
                "descriptor": {
                  "name": "Hindon River",
                  "code": "HINDON_RIVER"
                },
                "gps": "28.686176, 77.442632"
              },
              "id": "2",
              "parent_stop_id": "1"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 2"
              },
              "location": {
                "descriptor": {
                  "name": "Arthala"
                },
                "gps": "28.181276, 77.442332"
              },
              "id": "3",
              "parent_stop_id": "2"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 3"
              },
              "location": {
                "descriptor": {
                  "name": "Mohan Nagar"
                },
                "gps": "28.981276, 77.772332"
              },
              "id": "4",
              "parent_stop_id": "3"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 4"
              },
              "location": {
                "descriptor": {
                  "name": "Shyam Park"
                },
                "gps": "28.620976, 77.046732"
              },
              "id": "5",
              "parent_stop_id": "4"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 5"
              },
              "location": {
                "descriptor": {
                  "name": "Major Mohit Sharma Rajendra Nagar"
                },
                "gps": "28.120976, 77.946732"
              },
              "id": "6",
              "parent_stop_id": "5"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 6"
              },
              "location": {
                "descriptor": {
                  "name": "Raj Bagh"
                },
                "gps": "28.677076, 77.346632"
              },
              "id": "7",
              "parent_stop_id": "6"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 7"
              },
              "location": {
                "descriptor": {
                  "name": "Shaheed Nagar"
                },
                "gps": "28.617076, 77.146632"
              },
              "id": "8",
              "parent_stop_id": "7"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 8"
              },
              "location": {
                "descriptor": {
                  "name": "Dilshad Garden"
                },
                "gps": "28.917076, 77.146632"
              },
              "id": "9",
              "parent_stop_id": "8"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 9"
              },
              "location": {
                "descriptor": {
                  "name": "Jhilmil"
                },
                "gps": "28.897076, 77.146632"
              },
              "id": "10",
              "parent_stop_id": "9"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 10"
              },
              "location": {
                "descriptor": {
                  "name": "Mansarovar Park"
                },
                "gps": "28.117076, 77.116632"
              },
              "id": "11",
              "parent_stop_id": "10"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 11"
              },
              "location": {
                "descriptor": {
                  "name": "Shahdara"
                },
                "gps": "28.127076, 77.416632"
              },
              "id": "12",
              "parent_stop_id": "11"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 12"
              },
              "location": {
                "descriptor": {
                  "name": "Welcome"
                },
                "gps": "28.217076, 77.216632"
              },
              "id": "13",
              "parent_stop_id": "12"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 13"
              },
              "location": {
                "descriptor": {
                  "name": "Seelampur"
                },
                "gps": "28.327076, 77.416632"
              },
              "id": "14",
              "parent_stop_id": "13"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 14"
              },
              "location": {
                "descriptor": {
                  "name": "Shastri Park"
                },
                "gps": "28.427076, 77.446632"
              },
              "id": "15",
              "parent_stop_id": "14"
            },
            {
              "type": "TRANSIT_STOP",
              "instructions": {
                "name": "Stop 15",
                "short_desc": "Please Change here for Yellow Line"
              },
              "location": {
                "descriptor": {
                  "name": "Kashmere Gate"
                },
                "gps": "28.738426, 77.139922"
              },
              "id": "16",
              "parent_stop_id": "15"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 16"
              },
              "location": {
                "descriptor": {
                  "name": "Civil Lines"
                },
                "gps": "28.627076, 77.646632"
              },
              "id": "17",
              "parent_stop_id": "16"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 17"
              },
              "location": {
                "descriptor": {
                  "name": "Vidhan Sabha"
                },
                "gps": "28.727076, 77.746632"
              },
              "id": "18",
              "parent_stop_id": "17"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 18"
              },
              "location": {
                "descriptor": {
                  "name": "Vishwavidyalaya"
                },
                "gps": "28.827076, 77.846632"
              },
              "id": "19",
              "parent_stop_id": "18"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 19"
              },
              "location": {
                "descriptor": {
                  "name": "Guru Tegh Bahadur Nagar"
                },
                "gps": "28.927076, 77.946632"
              },
              "id": "20",
              "parent_stop_id": "19"
            },
            {
              "type": "INTERMEDIATE_STOP",
              "instructions": {
                "name": "Stop 20"
              },
              "location": {
                "descriptor": {
                  "name": "Model Town"
                },
                "gps": "28.217076, 77.496632"
              },
              "id": "21",
              "parent_stop_id": "20"
            },
            {
              "type": "END",
              "location": {
                "descriptor": {
                  "name": "Azadpur",
                  "code": "AZADPUR"
                },
                "gps": "28.707358, 77.180910"
              },
              "id": "22",
              "parent_stop_id": "21"
            }
          ],
          "vehicle": {
            "category": "METRO"
          },
          "tags": [
            {
              "descriptor": {
                "code": "TICKET_INFO"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "NUMBER"
                  },
                  "value": "7f3a8e9d"
                }
              ]
            }
          ]
        }
      ],
      "cancellation_terms": [
        {
          "external_ref": {
            "mimetype": "text/html",
            "url": "https://transitsolutions.com/mf/tnc.html"
          }
        }
      ],
      "tags": [
        {
          "descriptor": {
            "code": "SCHEDULED_INFO"
          },
          "display": false,
          "list": [
            {
              "descriptor": {
                "code": "GTFS"
              },
              "value": "https://metro-transit/gtfs-realtime"
            }
          ]
        }
      ],
      "billing": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+91-9897867564"
      },
      "quote": {
        "price": {
          "value": "120",
          "currency": "INR"
        },
        "breakup": [
          {
            "title": "BASE_FARE",
            "item": {
              "id": "I1",
              "price": {
                "currency": "INR",
                "value": "60"
              },
              "quantity": {
                "selected": {
                  "count": 2
                }
              }
            },
            "price": {
              "currency": "INR",
              "value": "120"
            }
          }
        ]
      },
      "payments": [
        {
          "id": "PA1",
          "collected_by": "BAP",
          "status": "PAID",
          "type": "PRE-ORDER",
          "params": {
            "transaction_id": "34cc9b0b-6887-4c63-8397-2f4fcf03e50d",
            "currency": "INR",
            "amount": "120",
            "bank_code": "XXXXXXXX",
            "bank_account_number": "xxxxxxxxxxxxxx",
            "virtual_payment_address": "9988199772@okicic"
          },
          "tags": [
            {
              "descriptor": {
                "code": "SETTLEMENT_DETAILS"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "SETTLEMENT_TYPE"
                  },
                  "value": "UPI"
                }
              ]
            },
            {
              "descriptor": {
                "code": "SETTLEMENT_TERMS"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "SETTLEMENT_WINDOW"
                  },
                  "value": "PT30D"
                },
                {
                  "descriptor": {
                    "code": "SETTLEMENT_BASIS"
                  },
                  "value": "INVOICE_RECEIPT"
                },
                {
                  "descriptor": {
                    "code": "MANDATORY_ARBITRATION"
                  },
                  "value": "true"
                },
                {
                  "descriptor": {
                    "code": "COURT_JURISDICTION"
                  },
                  "value": "New Delhi"
                },
                {
                  "descriptor": {
                    "code": "STATIC_TERMS"
                  },
                  "value": "https://api.example-bpp.com/booking/terms"
                },
                {
                  "descriptor": {
                    "code": "SETTLEMENT_AMOUNT"
                  },
                  "value": "59"
                }
              ]
            }
          ]
        }
      ],
      "created_at": "2021-03-23T10:00:40.065Z",
      "updated_at": "2021-03-23T10:00:40.065Z"
    }
  }
}


const jsonout = (json,filename)=>{
    const jsonString = JSON.stringify(json, null, 2)
    fs.writeFile(`./compare_temp/${filename}.json`,jsonString,(err,out)=>{
        if(err)console.log(err)
        else{
    console.log(out)}
    })
}

// jsonout(x,"on_status_mobguide")  

module.exports = jsonout