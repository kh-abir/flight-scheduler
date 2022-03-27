# frozen_string_literal: true

class Flight < ApplicationRecord
  enum status: {
    on_board: 'On board',
    on_air: 'On board',
    delaying: 'Delaying',
    canceled: 'Canceled',
    landed: 'Landed'
  }
end
